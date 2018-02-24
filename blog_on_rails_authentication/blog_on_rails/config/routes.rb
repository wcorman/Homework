Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

    namespace :admin do
      resources :dashboard, only: [:index]
    end

  resources :users, only: [:new, :create, :edit, :update] do

  end

  resource :sessions, only: [:new, :destroy, :create]

  resources :posts do
    resources :comments, only: [:create, :destroy], shallow: true
end

  patch('/user/:id/update_password', { to: 'users#update_password', as: :update_password})

  get('/', { to: 'posts#index', as: :root })

end
