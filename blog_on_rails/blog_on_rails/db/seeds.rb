# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Post.destroy_all
Comment.destroy_all

20.times.each do
  p = Post.create(
    title: Faker::Food.dish,
    body: Faker::Lorem.paragraph,
  )
  if p.valid?
    rand(3..35).times.each do
      Comment.create(
        body: Faker::RickAndMorty.quote,
        post_id: p.id
      )
    end
  end
end

posts = Post.all
comments = Comment.all

puts Cowsay.say "Created #{posts.count} posts", :frogs
puts Cowsay.say "Created #{comments.count} comments", :sheep
