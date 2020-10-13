class DropTags < ActiveRecord::Migration[6.0]
  def change
    remove_foreign_key(:posts, :tags) if foreign_key_exists?(:posts, :tags)
    drop_table :tags
    remove_column :posts, :tag_id
  end
end
