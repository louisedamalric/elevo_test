require 'rails_helper'

describe WeightConsistencyForm do
  describe '#valid?' do
    subject { form.valid? }

    let(:form) { described_class.new(weights) }
    let(:weights) { [20, 80] }

    it { is_expected.to be true }

    context 'when weights sum is not valid' do
      let(:weights) { [20, 10] }

      it 'contains an error' do
        expect(subject).to be false
        expect(form.errors.full_messages.first).to eq("Heads up! Your objective weights are invalid. " \
          "They should all be defined and the sum should be 100%. Actual sum: 30%")
      end
    end
  end
end
