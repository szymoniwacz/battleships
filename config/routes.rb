Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  resources 'games', only: [:new, :show], param: :slug do
    get 'statistics', on: :member
  end
  resources 'moves', only: [:create]

  root to: 'games#new'

  mount ActionCable.server => '/cable'
end
