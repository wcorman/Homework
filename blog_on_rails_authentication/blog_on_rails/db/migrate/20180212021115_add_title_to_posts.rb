class AddTitleToPosts < ActiveRecord::Migration[5.1]
  def change
    add_column  :posts, :title, :string
    add_column  :posts, :body, :text
  end
end
