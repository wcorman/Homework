# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
PASSWORD = 'supersecret'

Post.destroy_all
Comment.destroy_all
User.destroy_all



super_user = User.create(
  first_name: 'Wes',
  last_name: 'Corman',
  email: 'wcorman@gmail.com',
  password: PASSWORD,
  is_admin: true
)

10.times.each do
  first_name = Faker::Name.first_name
  last_name = Faker::Name.last_name

  User.create(
    first_name: first_name,
    last_name: last_name,
    email: "#{first_name.downcase}.#{last_name.downcase}@example.com",
    password: PASSWORD
  )
end

users = User.all

puts Cowsay.say "Created #{users.count} users", :tux



20.times.each do
  p = Post.create(
    title: Faker::Food.dish,
    body: Faker::Lorem.paragraph,
    user: users.sample
  )
  if p.valid?
    rand(3..35).times.each do
      Comment.create(
        body: Faker::RickAndMorty.quote,
        post_id: p.id,
        user: users.sample
      )
    end
  end
end

posts = Post.all
comments = Comment.all

puts Cowsay.say "Created #{posts.count} posts", :frogs
puts Cowsay.say "Created #{comments.count} comments", :sheep
