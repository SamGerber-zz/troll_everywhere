class Api::PollsController < Api::JSONApplicationController

  def new
    @poll = Poll.new()
    render :new
  end

  def create
    author = current_user
    merged_poll_params = {author_id: author.id}.merge(poll_params)
    @poll = Poll.new(merged_poll_params)
    if @poll.save
      render :show
    else
      render json: { errors: @poll.errors.full_messages }, status: 422
    end
  end

  def show
    @poll = get_poll_from_path

    if @poll
      render :show
    else
      render json: { errors: ["You may not view this poll"] }, status: 403
    end
  end

  def index
    @polls = current_user.polls

    if @polls
      render :index
    else
      render json: { errors: ["You may not view these polls"] }, status: 403
    end
  end

  def edit
    @poll = get_poll_from_path
    if @poll
      render :edit
    else
      render json: { errors: ["You may not edit this poll"] }, status: 403
    end
  end

  def update
    @poll = get_poll_from_path
    if @poll.update(poll_params)
      render :show
    else
      render json: { errors: @poll.errors.full_messages }, status: 422
    end
  end

  def destroy
    @poll = get_poll_from_path
    if @poll.destroy
      render :show
    else
      render json: { errors: @poll.errors.full_messages }, status: 422
    end
  end

    private
    def poll_params
      params.require(:poll).permit(:title, questions_attributes: [
        :title,
        :body,
        :image_url,
        :author_id,
        responses_attributes: [
          :body,
          :image_url,
          :author_id
          ]
      ])
    end

    def get_poll_from_path
      poll = Poll.find_by(id: params[:id])
      if poll && poll.author == current_user
        return poll
      else
        return nil
      end
    end
end
