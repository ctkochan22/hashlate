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

  # def hashify(package)
  #   if package.kind_of?(Array)
  #     #Run if Array

  #   elsif package.kind_of?(Hash)
  #     #Run if Hash
  #     # length = package.length()
  #     keys = package.keys
  #     if keys.length == 1


  #   else
  #     #Run if anything else
  #   end
  # end
end



# Stops for a given route:
# http://webservices.nextbus.com/service/publicXMLFeed?command=routeConfi
# g&a=sf-muni&r=N
#http://webservices.nextbus.com/service/publicXMLFeed?command=routeConfig&a=sf-muni&r=N

# Get Routes
# http://services.my511.org/Transit2.0/GetRoutesForAgencies.aspx?token=d7addd58-ca1e-4395-96f6-55440646c3ae&agencyNames=SF-MUNI

=begin

JSON OBJECT:
https://congress.api.sunlightfoundation.com/upcoming_bills?apikey=f5da3fb0d7b64be8b718f83d2be029e5

=end
