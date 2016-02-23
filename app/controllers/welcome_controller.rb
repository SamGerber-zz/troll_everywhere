class WelcomeController < ApplicationController
  skip_before_action :ensure_user_is_logged_in, only: :construction

  def construction
  end
end
