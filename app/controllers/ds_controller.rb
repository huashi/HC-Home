class DsController < ApplicationController
  def index
  render file: "app/views/xckb/ds.js", content_type: "application/json"
    end
end
