class Api::PresentationsController < ApplicationController
  def show
    @question = get_presentation_from_params
    if @question
      render "api/questions/show"
    else
      render json: { messages: ["No question presented"] }, status: 403
    end
  end

  def get_presentation_from_params
    user = User.includes(:active_question).find_by(username: params[:id])
    if user
      return user.active_question
    else
      return nil
    end
  end
end
