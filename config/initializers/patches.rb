class String

  def to_bool
    self.downcase == 'true' ? true : false
  end

end