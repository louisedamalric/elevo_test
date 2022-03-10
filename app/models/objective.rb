class Objective < ApplicationRecord
  validates :title, presence: true
  validates :weight, presence: true, numericality: { greater_than: 0, less_than_or_equal_to: 100 }
  validates :completion, numericality: { greater_than: 0 }, allow_nil: true
end
