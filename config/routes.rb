# == Route Map
#
#                Prefix Verb   URI Pattern                                 Controller#Action
#                  root GET    /                                           static_pages#root
#                       GET    /404(.:format)                              errors#not_found
#                       GET    /500(.:format)                              errors#exception
#                 users POST   /users(.:format)                            users#create
#              new_user GET    /users/new(.:format)                        users#new
#             edit_user GET    /users/:id/edit(.:format)                   users#edit
#                  user GET    /users/:id(.:format)                        users#show
#                       PATCH  /users/:id(.:format)                        users#update
#                       PUT    /users/:id(.:format)                        users#update
#                       DELETE /users/:id(.:format)                        users#destroy
#               session POST   /session(.:format)                          sessions#create
#           new_session GET    /session/new(.:format)                      sessions#new
#                       DELETE /session(.:format)                          sessions#destroy
#        api_user_polls GET    /api/users/:user_id/polls(.:format)         api/polls#index {:format=>:json}
#                       POST   /api/users/:user_id/polls(.:format)         api/polls#create {:format=>:json}
#     new_api_user_poll GET    /api/users/:user_id/polls/new(.:format)     api/polls#new {:format=>:json}
#             api_users POST   /api/users(.:format)                        api/users#create {:format=>:json}
#          new_api_user GET    /api/users/new(.:format)                    api/users#new {:format=>:json}
#         edit_api_user GET    /api/users/:id/edit(.:format)               api/users#edit {:format=>:json}
#              api_user GET    /api/users/:id(.:format)                    api/users#show {:format=>:json}
#                       PATCH  /api/users/:id(.:format)                    api/users#update {:format=>:json}
#                       PUT    /api/users/:id(.:format)                    api/users#update {:format=>:json}
#                       DELETE /api/users/:id(.:format)                    api/users#destroy {:format=>:json}
#    api_poll_questions GET    /api/polls/:poll_id/questions(.:format)     api/questions#index {:format=>:json}
#                       POST   /api/polls/:poll_id/questions(.:format)     api/questions#create {:format=>:json}
# new_api_poll_question GET    /api/polls/:poll_id/questions/new(.:format) api/questions#new {:format=>:json}
#         edit_api_poll GET    /api/polls/:id/edit(.:format)               api/polls#edit {:format=>:json}
#              api_poll GET    /api/polls/:id(.:format)                    api/polls#show {:format=>:json}
#                       PATCH  /api/polls/:id(.:format)                    api/polls#update {:format=>:json}
#                       PUT    /api/polls/:id(.:format)                    api/polls#update {:format=>:json}
#                       DELETE /api/polls/:id(.:format)                    api/polls#destroy {:format=>:json}
#     edit_api_question GET    /api/questions/:id/edit(.:format)           api/questions#edit {:format=>:json}
#          api_question GET    /api/questions/:id(.:format)                api/questions#show {:format=>:json}
#                       PATCH  /api/questions/:id(.:format)                api/questions#update {:format=>:json}
#                       PUT    /api/questions/:id(.:format)                api/questions#update {:format=>:json}
#                       DELETE /api/questions/:id(.:format)                api/questions#destroy {:format=>:json}
#

Rails.application.routes.draw do
  root "static_pages#root"

  get "/404" => "errors#not_found"
  get "/500" => "errors#exception"

  resources :users, except: [:index]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: {format: :json} do
    resources :users, except: [:index] do
      resources :polls, only: [:new, :create, :index]
    end
    resources :polls, except: [:new, :create, :index] do
      resources :questions, only: [:new, :create, :index]
    end
    resources :questions, except: [:new, :create, :index] do
      resources :responses, only: [:new, :create, :index]
    end
    resources :responses, except: [:new, :create, :index] do
      resources :votes, only: [:new, :create, :index]
    end
    resources :votes, except: [:new, :create, :index]
  end
end
