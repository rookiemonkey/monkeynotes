class Notebook < ApplicationRecord

  has_many :pages, dependent: :destroy

  validates :subject, length: { within: 2..20 }

  def add_page(params)
    raise 'Please provide a subject' unless params[:subject].present?
    raise 'Please provide a content' unless params[:content].present?

    self.pages << Page.create(subject: params[:subject], content: params[:content])
  end

end
