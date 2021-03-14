class Page < ApplicationRecord

  belongs_to :notebook
  has_rich_text :content

  validates :subject, length: { within: 2..50 }
  validates :content, presence: true

end
