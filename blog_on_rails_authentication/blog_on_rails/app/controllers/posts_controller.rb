class PostsController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]
  before_action :find_post, except: [:new, :index, :create]
  before_action :authorize_user!, only: [:edit, :update, :destroy]


  def index
    # Instance variables defined controllers are equally
    # accessible inside templates. Use them to pass data
    # to your views.
    @post = Post.order(created_at: :desc)
    # For any action, Rails will by default render
    # a template named after the action, like below:
    # render :index
  end

  def new
    @post = Post.new
  end

  def show
    @post = Post.find params[:id]
    @comment = Comment.new
    @comments = @post.comments

  end

  def create
    # In rails, form data, URL params and query params are all in
    # the `params` object which is available in controllers.
    @post = Post.new post_params

    if @post.save
      redirect_to post_path(@post)
    else
      render :new
    end
  end

def edit
  @post = Post.find params[:id]
end


  def update
    if @post.update post_params
      redirect_to post_path(@post)
    else
      render :edit
    end
  end


  def destroy
    @post.destroy
    redirect_to posts_path
  end
end

private
def find_post
  @post = Post.find params[:id]
end

def post_params
  # `require` will extract a nested hash from the params by
  # its key's name.
  params.require(:post).permit(:title, :body)
  # when using `require`, you must permit every field
  # by their name (as symbols) from your form. Otherwise,
  # Rails will give you this error, ActiveModel::ForbiddenAttributesError
  # when trying to create the model instance. This is a security measure.
end

def authorize_user!
  unless can?(:manage, @post)
    flash[:alert] = "Access Denied!"
    redirect_to post_path(@post)
  end
end
