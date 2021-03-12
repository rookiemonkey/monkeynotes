class Notebook < ApplicationRecord

  has_many :pages

  validates :subject, length: { within: 2..20 }

end
