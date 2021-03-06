module Exceptions
  module MonkeynoteErrors

    class CreatePageError < StandardError; end
    class UpdatePageError < StandardError; end
    class CreateCategoryError < StandardError; end
    class CreateNotebookError < StandardError; end
    class UpdateCategoryError < StandardError; end
    class AuthenticationError < StandardError; end

  end
end