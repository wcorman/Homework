class UsersController < ApplicationController

  before_action :authenticate_user!, only: [:update_password]

  def new
    @user = User.new
  end

  def create
    @user = User.new user_params
    if @user.save
      session[:user_id] = @user.id
      redirect_to root_path, notice: `Logged In as #{current_user.first_name}`
    else
      render :new
    end
  end

  def edit
    @user = User.find params[:id]
  end

  def update
    @user = User.find params[:id]
    if @user.update user_params
      flash[:alert] = 'Profile updated!'
      redirect_to root_path
    else
      render :edit
    end
  end

  def update_password
    @user = current_user
    current_password = password_params[:current_password]
    new_password = password_params[:password]
    password_confirm = password_params[:password_confirmation]

    if @user&.authenticate(password_params[:current_password])
      if new_password != current_password
        @user.password = new_password
        @user.password_confirmation = password_confirm
        if @user.save
          flash[:notice] = "Nice! updated password!"
          redirect_to edit_user_path
        else
          flash.now[:alert] = "Failed to update password"
          render :edit
        end
      else
        flash.now[:alert] = "new password and confirmation did not match confirmation."
        render :edit
      end
    else
      flash.now[:alert] = "Incorrect password."
      render :edit
    end
  end


  private

  def is_admin?
    self.user_role == 1
  end


  def user_params
    params.require(:user).permit(
      :first_name,
      :last_name,
      :email,
      :password,
      :password_confirmation
    )
  end

  def password_params
    params.require(:user).permit(
      :current_password,
      :password,
      :password_confirmation
    )
  end
end
