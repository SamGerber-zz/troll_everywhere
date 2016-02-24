# == Route Map
#
#        Prefix Verb   URI Pattern                   Controller#Action
#          root GET    /                             welcome#construction
#               GET    /404(.:format)                errors#not_found
#               GET    /500(.:format)                errors#exception
#         users POST   /users(.:format)              users#create
#      new_user GET    /users/new(.:format)          users#new
#     edit_user GET    /users/:id/edit(.:format)     users#edit
#          user GET    /users/:id(.:format)          users#show
#               PATCH  /users/:id(.:format)          users#update
#               PUT    /users/:id(.:format)          users#update
#               DELETE /users/:id(.:format)          users#destroy
#       session POST   /session(.:format)            sessions#create
#   new_session GET    /session/new(.:format)        sessions#new
#               DELETE /session(.:format)            sessions#destroy
#     api_users POST   /api/users(.:format)          api/users#create {:format=>:json}
#  new_api_user GET    /api/users/new(.:format)      api/users#new {:format=>:json}
# edit_api_user GET    /api/users/:id/edit(.:format) api/users#edit {:format=>:json}
#      api_user GET    /api/users/:id(.:format)      api/users#show {:format=>:json}
#               PATCH  /api/users/:id(.:format)      api/users#update {:format=>:json}
#               PUT    /api/users/:id(.:format)      api/users#update {:format=>:json}
#               DELETE /api/users/:id(.:format)      api/users#destroy {:format=>:json}
#

Rails.application.routes.draw do
  root "welcome#construction"

  get "/404" => "errors#not_found"
  get "/500" => "errors#exception"

  resources :users, except: [:index]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: {format: :json} do
    resources :users, except: [:index]
  end
end
