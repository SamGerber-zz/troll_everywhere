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
    @question = Question.includes(:poll, :author, :active_for_user).find_by(id: params[:id])

    if @question
      render :show
    else
      render json: { errors: ["No such question"] }, status: 403
    end
  end

  def index
    @questions = Poll.includes(:questions, questions: [:active_for_user]).find_by(id: params[:poll_id]).questions

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
    @questions = get_questions_from_path
    if @questions.update_all(question_params)
      render :index
    else
      render json: { errors: @questions.errors.full_messages }, status: 422
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
      params.require(:question).permit(:title, :body, :image_url, :is_locked)
    end

    def get_question_from_path
      question = Question.find_by(id: params[:id])
      if question.author == current_user
        return question
      else
        return nil
      end
    end

    def get_questions_from_path
      questions = []
      question_ids = params[:id].split(',').map(&:to_i)
      current_user.questions.where(id: question_ids)
    end
end
