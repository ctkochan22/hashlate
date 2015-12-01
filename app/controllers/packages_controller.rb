class PackagesController < ApplicationController
  include HTTParty

  def index
  end

  def hash
    url = params["package"]

    puts "Package accepted: "
    p url
    p "*****"

    @response = HTTParty.get(url).parsed_response

    puts "Package Response"
    # p @response
  end

  def test
    p "TEEEEEESSSST"
  end
end


=begin
Stops for a given route:
http://webservices.nextbus.com/service/publicXMLFeed?command=routeConfi
g&a=sf-muni&r=N

Get Routes
http://services.my511.org/Transit2.0/GetRoutesForAgencies.aspx?token=d7addd58-ca1e-4395-96f6-55440646c3ae&agencyNames=SF-MUNI


=end