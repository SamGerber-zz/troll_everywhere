class Api::ResponsesController < Api::JSONApplicationController

  def new
    @response = Response.new()
    render :new
  end

  def create

    merged_response_params = {
      question_id: params[:question_id],
      author_id: current_user.id
    }.merge(response_params)
    
    @response = Response.new(merged_response_params)
    if @response.save
      render :show
    else
      render json: { errors: @response.errors.full_messages }, status: 422
    end
  end

  def show
    @response = get_response_from_path

    if @response
      render :show
    else
      render json: { errors: ["You may not view this response"] }, status: 403
    end
  end

  def index
    @responses = Poll.find_by(id: params[:question_id]).responses

    if @responses
      render :index
    else
      render json: { errors: ["You may not view these responses"] }, status: 403
    end
  end

  def edit
    @response = get_response_from_path
    if @response
      render :edit
    else
      render json: { errors: ["You may not edit this response"] }, status: 403
    end
  end

  def update
    @response = get_response_from_path
    if @response.update(response_params)
      render :show
    else
      render json: { errors: @response.errors.full_messages }, status: 422
    end
  end

  def destroy
    @response = get_response_from_path
    if @response.destroy
      render :show
    else
      render json: { errors: @response.errors.full_messages }, status: 422
    end
  end

    private
    def response_params
      params.require(:response).permit(:body, :image_url)
    end

    def get_response_from_path
      response = Response.find_by(id: params[:id])
      if [response.author, response.poll_author].include?(current_user)
        return response
      else
        return nil
      end
    end
end
