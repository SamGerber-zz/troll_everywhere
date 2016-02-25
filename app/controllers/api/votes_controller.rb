class Api::VotesController < Api::JSONApplicationController

  def new
    @vote = Vote.new()
    render :new
  end

  def create
    merged_vote_params = {
      response_id: params[:response_id],
      voter_id: current_user.id
    }.merge(vote_params)

    @vote = Vote.new(merged_vote_params)
    if @vote.save
      render :show
    else
      render json: { errors: @vote.errors.full_messages }, status: 422
    end
  end

  def show
    @vote = get_vote_from_path

    if @vote
      render :show
    else
      render json: { errors: ["You may not view this vote"] }, status: 403
    end
  end

  def index
    @votes = Response.find_by(id: params[:response_id]).votes

    if @votes
      render :index
    else
      render json: { errors: ["You may not view these votes"] }, status: 403
    end
  end

  def edit
    @vote = get_vote_from_path
    if @vote
      render :edit
    else
      render json: { errors: ["You may not edit this vote"] }, status: 403
    end
  end

  def update
    @vote = get_vote_from_path
    if @vote.update(vote_params)
      render :show
    else
      render json: { errors: @vote.errors.full_messages }, status: 422
    end
  end

  def destroy
    @vote = get_vote_from_path
    if @vote.destroy
      render :show
    else
      render json: { errors: @vote.errors.full_messages }, status: 422
    end
  end

    private
    def vote_params
      params.require(:vote).permit(:is_up_vote)
    end

    def get_vote_from_path
      vote = Vote.find_by(id: params[:id])
      if [vote.voter, vote.poll_author].include?(current_user)
        return vote
      else
        return nil
      end
    end
end
