json.data do
  json.array! @objectives do |objective|
    json.(objective, :id, :title, :weight)
  end
end
json.weight_consistency_error @weight_consistency_error
