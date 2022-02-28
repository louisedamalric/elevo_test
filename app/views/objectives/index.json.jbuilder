json.array! @objectives do |objective|
  json.(objective, :id, :title, :weights)
end
