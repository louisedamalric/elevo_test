Rails.application.routes.draw do
  root 'pages#home'
  resources :objectives, only: [:index, :create]
end
