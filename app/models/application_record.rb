class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def slugify
    self.slug = self.subject.parameterize
  end

end
