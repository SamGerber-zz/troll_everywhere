class Api::JSONApplicationController < ApplicationController

    private
    def ensure_user_is_logged_in
      unless user_is_logged_in?
        render json: { errors: ["You must be logged in"] }, status: 403
      end
    end

    def ensure_user_is_logged_out
      if user_is_logged_in?
          render json: { errors: ["You are already logged in"] }, status: 403
      end
    end
end
