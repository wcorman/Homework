class CommentsController < ApplicationController
  before_action :authenticate_user!
  before_action :find_comment, only: [:destroy]
  before_action :authorize_user!, only: [:edit, :update, :destroy]

  def create
    @post = Post.find params[:post_id]
    @comment = Comment.new comment_params
    @comment.post = @post
    @comment.user = current_user

    if @comment.save
      redirect_to post_path(@post)
    else
      @comments = @post.comments.order(created_at: :desc)
      render 'posts/show'
    end
  end

  def show
    @comments = Comment.all
  end

  def destroy
    @post = @comment.post
    @comment.destroy
    redirect_to post_path(@post)
  end


  private

  def authorize_user!
    unless can?(:manage, @comment)
      flash[:alert] = 'Access Denied!'
      redirect_to post_path(@comment.post)
    end
  end

  def comment_params
    params.require(:comment).permit(:body)
  end

  def find_comment
    @comment ||= Comment.find params[:id]
  end
end
