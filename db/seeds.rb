# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


# NOTEBOOKS

nb_1 = Notebook.create subject: 'Javascript'
nb_2 = Notebook.create subject: 'PHP'
nb_3 = Notebook.create subject: 'Express JS'
nb_4 = Notebook.create subject: 'Passport JS'
nb_5 = Notebook.create subject: 'NPM'
nb_6 = Notebook.create subject: 'Laravel'
nb_7 = Notebook.create subject: 'Ruby'

notebooks = [nb_1, nb_2, nb_3, nb_4, nb_5, nb_6, nb_7]


# PAGES

notebooks.each do |nb|
  20.times do |n|
    nb.pages << Page.create(subject: "#{nb.subject} #{n}", 
                            content: "<p>Content for #{nb.subject} #{n}</p>",
                            language: 'ruby')
  end
end
