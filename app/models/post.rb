class Post < ApplicationRecord
  validates :body, presence: true

  belongs_to :tag
  delegate :name, to: :tag, prefix: true

  def tags
    Tag.all
  end
end
