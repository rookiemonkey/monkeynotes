class Notebook < ApplicationRecord

  validates :subject, length: { within: 2..20 }

end
