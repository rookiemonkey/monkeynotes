class Category < ApplicationRecord

  has_many :notebooks
  
  validates :subject, 
          uniqueness: { case_sensitive: false },
          length: { within: 2..50 }

end
