class Notebook < ApplicationRecord

  has_many :pages, dependent: :destroy
  
  before_save :slugify

  validates :subject, 
            uniqueness: { case_sensitive: false },
            length: { within: 2..50 }

  def add_page(params)
    raise 'Please provide a subject' unless params[:subject].present?
    raise 'Please provide a content' unless params[:content].present?
    self.pages << Page.create(subject: params[:subject], content: params[:content])
  end


  private

  def slugify
    self.slug = self.subject.parameterize
  end

end
