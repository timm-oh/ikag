class Tag < ApplicationRecord
  before_validation -> { self.name&.downcase! }
end
