class Page < ApplicationRecord
  has_rich_text :content

  validates :subject, length: { within: 2..20 }
  validates :content, presence: true
end
