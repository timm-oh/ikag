class SeedTags < ActiveRecord::Migration[6.0]
  def change
    ['unknown', 'house repairs', 'web development', 'job oppotunities'].each do |name|
      Tag.find_or_create_by(name: name)
    end
    Post.where(tag_id: nil).update_all(tag_id: Tag.find_by(name: 'unknown').id)
  end
end
