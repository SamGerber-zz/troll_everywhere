# == Schema Information
#
# Table name: users
#
#  id                 :integer          not null, primary key
#  username           :string           not null
#  email              :string           not null
#  password_digest    :string           not null
#  session_token      :string           not null
#  url_suffix         :string           not null
#  created_at         :datetime
#  updated_at         :datetime
#  active_question_id :integer
#  is_guest           :boolean          not null
#

class UsersController < ApplicationController

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
      flash[:messages] = ["Welcome to TrollEverywhere, #{@user.username}!"]
      redirect_to root_url
    else
      flash[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def show
    @user = get_user_from_path

    if @user == current_user
      render :show
    else
      flash[:errors] = ["You may not view other users' pages"]
      redirect_to user_url(current_user)
    end
  end

  def edit
    @user = get_user_from_path
    if @user == current_user
      render :edit
    else
      flash[:errors] = ["You may not edit other users' accounts"]
      redirect_to edit_user_url(current_user)
    end
  end

  def update
    @user = get_user_from_path
    if @user.update(user_params)
      flash[:messages] = ["Changes to #{@user.username}'s account saved'!"]
      redirect_to user_url(@user)
    else
      flash[:errors] = @user.errors.full_messages
      render :edit
    end
  end

  def destroy
    @user = get_user_from_path
    if @user.destroy
      flash[:messages] = ["#{@user.username}'s account deleted'!"]
    else
      flash[:errors] = @user.errors.full_messages
    end
    redirect_to root_url
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
