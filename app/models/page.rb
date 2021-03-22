class Page < ApplicationRecord

  belongs_to :notebook
  has_rich_text :content

  before_save :slugify
  before_save :normalize_language

  validates :subject, uniqueness: { case_sensitive: false }, length: { within: 2..50 }
  validates :content, presence: true
  validates :language, presence: true

  private

  def normalize_language
    self.language = self.language.downcase
  end

end
