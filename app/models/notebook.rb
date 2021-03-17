class Notebook < ApplicationRecord

  has_many :pages, dependent: :destroy
  belongs_to :category
  
  before_save :slugify

  validates :subject, 
            uniqueness: { case_sensitive: false },
            length: { within: 2..50 }

end
