require 'test_helper'

class PostsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @post = posts(:one)
  end

  test "should get index" do
    get posts_url
    assert_response :success
  end

  test "should create post" do
    tag = Tag.first
    assert_difference('Post.count') do
      post posts_url, params: { post: { body: @post.body, tag_id: tag.id } }
    end

    assert_redirected_to posts_url
  end

  # test "should show post" do
  #   get post_url(@post)
  #   assert_response :success
  # end
end
