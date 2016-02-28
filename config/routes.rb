# == Route Map
#
#                    Prefix Verb   URI Pattern                                         Controller#Action
#                      root GET    /                                                   static_pages#root
#                           GET    /404(.:format)                                      errors#not_found
#                           GET    /500(.:format)                                      errors#exception
#               api_session POST   /api/session(.:format)                              api/sessions#create {:format=>:json}
#           new_api_session GET    /api/session/new(.:format)                          api/sessions#new {:format=>:json}
#                           GET    /api/session(.:format)                              api/sessions#show {:format=>:json}
#                           DELETE /api/session(.:format)                              api/sessions#destroy {:format=>:json}
#            api_user_polls GET    /api/users/:user_id/polls(.:format)                 api/polls#index {:format=>:json}
#                           POST   /api/users/:user_id/polls(.:format)                 api/polls#create {:format=>:json}
#         new_api_user_poll GET    /api/users/:user_id/polls/new(.:format)             api/polls#new {:format=>:json}
#                 api_users POST   /api/users(.:format)                                api/users#create {:format=>:json}
#              new_api_user GET    /api/users/new(.:format)                            api/users#new {:format=>:json}
#             edit_api_user GET    /api/users/:id/edit(.:format)                       api/users#edit {:format=>:json}
#                  api_user GET    /api/users/:id(.:format)                            api/users#show {:format=>:json}
#                           PATCH  /api/users/:id(.:format)                            api/users#update {:format=>:json}
#                           PUT    /api/users/:id(.:format)                            api/users#update {:format=>:json}
#                           DELETE /api/users/:id(.:format)                            api/users#destroy {:format=>:json}
#        api_poll_questions GET    /api/polls/:poll_id/questions(.:format)             api/questions#index {:format=>:json}
#                           POST   /api/polls/:poll_id/questions(.:format)             api/questions#create {:format=>:json}
#     new_api_poll_question GET    /api/polls/:poll_id/questions/new(.:format)         api/questions#new {:format=>:json}
#             edit_api_poll GET    /api/polls/:id/edit(.:format)                       api/polls#edit {:format=>:json}
#                  api_poll GET    /api/polls/:id(.:format)                            api/polls#show {:format=>:json}
#                           PATCH  /api/polls/:id(.:format)                            api/polls#update {:format=>:json}
#                           PUT    /api/polls/:id(.:format)                            api/polls#update {:format=>:json}
#                           DELETE /api/polls/:id(.:format)                            api/polls#destroy {:format=>:json}
#    api_question_responses GET    /api/questions/:question_id/responses(.:format)     api/responses#index {:format=>:json}
#                           POST   /api/questions/:question_id/responses(.:format)     api/responses#create {:format=>:json}
# new_api_question_response GET    /api/questions/:question_id/responses/new(.:format) api/responses#new {:format=>:json}
#         edit_api_question GET    /api/questions/:id/edit(.:format)                   api/questions#edit {:format=>:json}
#              api_question GET    /api/questions/:id(.:format)                        api/questions#show {:format=>:json}
#                           PATCH  /api/questions/:id(.:format)                        api/questions#update {:format=>:json}
#                           PUT    /api/questions/:id(.:format)                        api/questions#update {:format=>:json}
#                           DELETE /api/questions/:id(.:format)                        api/questions#destroy {:format=>:json}
#        api_response_votes GET    /api/responses/:response_id/votes(.:format)         api/votes#index {:format=>:json}
#                           POST   /api/responses/:response_id/votes(.:format)         api/votes#create {:format=>:json}
#     new_api_response_vote GET    /api/responses/:response_id/votes/new(.:format)     api/votes#new {:format=>:json}
#         edit_api_response GET    /api/responses/:id/edit(.:format)                   api/responses#edit {:format=>:json}
#              api_response GET    /api/responses/:id(.:format)                        api/responses#show {:format=>:json}
#                           PATCH  /api/responses/:id(.:format)                        api/responses#update {:format=>:json}
#                           PUT    /api/responses/:id(.:format)                        api/responses#update {:format=>:json}
#                           DELETE /api/responses/:id(.:format)                        api/responses#destroy {:format=>:json}
#             edit_api_vote GET    /api/votes/:id/edit(.:format)                       api/votes#edit {:format=>:json}
#                  api_vote GET    /api/votes/:id(.:format)                            api/votes#show {:format=>:json}
#                           PATCH  /api/votes/:id(.:format)                            api/votes#update {:format=>:json}
#                           PUT    /api/votes/:id(.:format)                            api/votes#update {:format=>:json}
#                           DELETE /api/votes/:id(.:format)                            api/votes#destroy {:format=>:json}
#                           GET    /*path(.:format)                                    static_pages#root
#

Rails.application.routes.draw do
  root "static_pages#root"

  get "/404" => "errors#not_found"
  get "/500" => "errors#exception"

  # resources :users, except: [:index]
  # resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: {format: :json} do
    resource :session, only: [:new, :show, :create, :destroy]
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
  get "/*path" => "static_pages#root"
end
