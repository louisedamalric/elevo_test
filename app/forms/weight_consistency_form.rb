class WeightConsistencyForm
  include ActiveModel::Model

  VALID_TOTAL_WEIGHT = 100

  validate :valid_total_weight

  def initialize(weights)
    @weights = weights
    raise ArgumentError, 'weights argument must be an array of integers' unless valid_argument?
  end
  
  private
  
  def valid_total_weight
    return if @weights.empty?

    if @weights.sum != VALID_TOTAL_WEIGHT
      errors.add(
        :weight, 
        "Heads up! Your objective weights are invalid. 
        They should all be defined and the sum should be 100%.
        Actual sum: #{@weights.sum}%"
      )
    end
  end

  def valid_argument?
    return false unless @weights.is_a?(Array)
    return false if @weights.any? { |weight| !weight.is_a?(Integer) }

    true
  end
end
