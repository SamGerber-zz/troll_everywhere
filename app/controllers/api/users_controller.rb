class Api::UsersController < Api::JSONApplicationController

  skip_before_action :ensure_user_is_logged_in, only: [:new, :create]
  before_action :ensure_user_is_logged_out, only: [:new, :create]

  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login_user!(@user)
      render :show
    else
      render json: { errors: @user.errors.full_messages }, status: 422
    end
  end

  def show
    @user = get_user_from_path

    if @user == current_user
      render :show
    else
      render json: { errors: ["You may not view other users' accounts"] }, status: 403
    end
  end

  def edit
    @user = get_user_from_path
    if @user == current_user
      render :edit
    else
      render json: { errors: ["You may not edit other users' accounts"] }, status: 403
    end
  end

  def update
    @user = get_user_from_path
    if @user.update(user_params)
      render :show
    else
      render json: { errors: @user.errors.full_messages }, status: 422
    end
  end

  def destroy
    @user = get_user_from_path
    if @user.destroy
      render :show
    else
      render json: { errors: @user.errors.full_messages }, status: 422
    end
  end

    private
    def get_user_from_path
      user = User.find_by(id: params[:id])
      if user == current_user
        return user
      else
        return nil
      end
    end
end
