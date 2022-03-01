json.array! @objectives do |objective|
  json.partial! 'show', objective: objective
end
