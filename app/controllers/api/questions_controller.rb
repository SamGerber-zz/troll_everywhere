class Api::QuestionsController < Api::JSONApplicationController

  def new
    @question = Question.new()
    render :new
  end

  def create
    merged_question_params = {poll_id: params[:poll_id]}.merge(question_params)
    @question = Question.new(merged_question_params)
    if @question.save
      render :show
    else
      render json: { errors: @question.errors.full_messages }, status: 422
    end
  end

  def show
    @question = get_question_from_path

    if @question
      render :show
    else
      render json: { errors: ["You may not view this question"] }, status: 403
    end
  end

  def index
    @questions = Poll.find_by(id: params[:poll_id]).questions

    if @questions
      render :index
    else
      render json: { errors: ["You may not view these questions"] }, status: 403
    end
  end

  def edit
    @question = get_question_from_path
    if @question
      render :edit
    else
      render json: { errors: ["You may not edit this question"] }, status: 403
    end
  end

  def update
    @question = get_question_from_path
    if @question.update(question_params)
      render :show
    else
      render json: { errors: @question.errors.full_messages }, status: 422
    end
  end

  def destroy
    @question = get_question_from_path
    if @question.destroy
      render :show
    else
      render json: { errors: @question.errors.full_messages }, status: 422
    end
  end

    private
    def question_params
      params.require(:question).permit(:title, :body, :image_url)
    end

    def get_question_from_path
      question = Question.find_by(id: params[:id])
      if question.author == current_user
        return question
      else
        return nil
      end
    end
end
