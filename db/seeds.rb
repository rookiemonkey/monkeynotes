# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


# CATEGORIES
vanilla = Category.create(subject: 'Vanilla')
frameworks = Category.create(subject: 'Frameworks')






# NOTEBOOKS

javascript    = Notebook.create subject: 'Javascript', category: vanilla
php           = Notebook.create subject: 'PHP', category: vanilla
expressjs     = Notebook.create subject: 'Express JS', category: frameworks
laravel       = Notebook.create subject: 'Laravel', category: frameworks
ruby          = Notebook.create subject: 'Ruby', category: vanilla






# PAGES
num_of_pages = 500

num_of_pages.times do |i|
  html = <<-HTML
    <p>Content for #{javascript.subject} #{i}</p>
    <pre>
      // program that checks if the number is positive, negative or zero
      // input from the user
      const number = parseInt(prompt("Enter a number: "));

      // check if number is greater than 0
      if (number > 0) {
          console.log("The number is positive");
      }
    </pre>
  HTML

  javascript.pages << Page.create(subject: "#{javascript.subject} #{i}", 
                                  content: html,
                                  language: 'javascript')
end

puts "Created #{num_of_pages} Javascript Pages"


num_of_pages.times do |i|
  html = <<-HTML
    <p>Content for #{php.subject} #{i}</p>
    <pre>
      <?php
        echo "Hello!";
        echo "Welcome to Developer News";
        echo "Enjoy all of the ad-free articles"
      ?>
    </pre>
  HTML

  php.pages << Page.create(subject: "#{php.subject} #{i}", 
                          content: html,
                          language: 'php')
end

puts "Created #{num_of_pages} PHP Pages"


num_of_pages.times do |i|
  html = <<-HTML
    <p>Content for #{expressjs.subject} #{i}</p>
    <pre>
      const express = require('express')
      const app = express()
      const port = 3000

      app.get('/', (req, res) => {
        res.send('Hello World!')
      })

      app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
      })
    </pre>
  HTML

  expressjs.pages << Page.create(subject: "#{expressjs.subject} #{i}", 
                                content: html,
                                language: 'javascript')
end

puts "Created #{num_of_pages} Express JS Pages"


num_of_pages.times do |i|
  html = <<-HTML
    <p>Content for #{laravel.subject} #{i}</p>
    <pre>
      class CreateStudentRecordsTable extends Migration
      {
          public function up()
          {
              Schema::create('student__records', function (Blueprint $table) {
                  $table->increments('id');
                  $table->timestamps();
              });
          }

          public function down()
          {
              Schema::dropIfExists('student__records');
          }
      }
    </pre>
  HTML

  laravel.pages << Page.create(subject: "#{laravel.subject} #{i}", 
                                content: html,
                                language: 'php')
end

puts "Created #{num_of_pages} Laravel Pages"


num_of_pages.times do |i|
  html = <<-HTML
    <p>Content for #{ruby.subject} #{i}</p>
    <pre>
      def sum_eq_n?(arr, n)
        return true if arr.empty? && n == 0
        arr.product(arr).reject { |a,b| a == b }.any? { |a,b| a + b == n }
      end
    </pre>
  HTML

  ruby.pages << Page.create(subject: "#{ruby.subject} #{i}", 
                            content: html,
                            language: 'ruby')
end

puts "Created #{num_of_pages} Ruby Pages"