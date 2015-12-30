class PackagesController < ApplicationController
  include HTTParty

  def index
  end

  def hash
    url = params[:url]
    response = HTTParty.get(url).parsed_response
    @html_package = hashify(response, "", 5)
    ap @html_package
    render "packages/_package", layout: false
  end


def hashify(obj_package, base_path, indent)
  full_html = ""
  new_indent = indent * 2
  indent_html = "text-indent:#{indent.to_s}px;"
  new_indent_html = "text-indent:#{new_indent.to_s}px;"

  if obj_package.kind_of?(Array)
    puts("Caught Array")

    full_html += "<p data-path=#{base_path} style=#{new_indent_html}>[</p>"
    obj_package.each_with_index do |element, index|
      new_base_path = base_path + "[#{index.to_s}]"
      new_html_item = hashify(obj_package[index], new_base_path, new_indent)
      if index == (obj_package.length - 1)
        full_html_item = "<p data-path=#{new_base_path} style=#{new_indent_html}>#{new_html_item}</p>"
      else
        if new_html_item[0..1] == "<p"
          full_html_item = new_html_item[0...-4] + "," + new_html_item[-4..-1]
        else
          full_html_item = "<p data-path=#{new_base_path} style=#{new_indent_html}>#{new_html_item},</p>"
        end
      end
      full_html += full_html_item
    end #each loop
    full_html += "<p data-path=#{base_path} style=#{new_indent_html}>]</p>"
    return full_html

  elsif obj_package.kind_of?(Hash)
    puts("Caught Object")
    object_html = ""

    full_html += "<p data-path=#{base_path} style=#{new_indent_html}>{</p>"

    obj_package.each do |key, value|
      new_base_path = base_path + "['#{key}']"
      new_html_item = hashify(obj_package[key], new_base_path, new_indent)
      if new_html_item[0..1] == "<p"
        full_html_item = "<p data-path=#{new_base_path} style=#{new_indent_html}>#{key}: " + new_html_item[0...-4] + "," + new_html_item[-4..-1]
      else
        full_html_item = "<p data-path=#{new_base_path} style=#{new_indent_html}>#{key}: #{new_html_item},</p>"
      end
      object_html += full_html_item
    end

    object_html = object_html[0... -5] + object_html[-4..-1]
    full_html += object_html
    full_html += "<p data-path=#{base_path} style=#{new_indent_html}>}</p>"
    return full_html
  else
    puts("Caught Single Element")

    if obj_package.is_a? Numeric
      return "'" + obj_package.to_s + "'"
    elsif obj_package.is_a? String
      return "'" + obj_package + "'"
    elsif !!obj_package == obj_package
      return obj_package.to_s
    elsif obj_package == nil
      return "NIL"
    else
      return "ERROR: Fatal Failure"
    end
  end
  puts full_html
end
end




# Stops for a given route:
# http://webservices.nextbus.com/service/publicXMLFeed?command=routeConfi
# g&a=sf-muni&r=N
#http://webservices.nextbus.com/service/publicXMLFeed?command=routeConfig&a=sf-muni&r=N

# Get Routes
# http://services.my511.org/Transit2.0/GetRoutesForAgencies.aspx?token=d7addd58-ca1e-4395-96f6-55440646c3ae&agencyNames=SF-MUNI

=begin

XML OBJECT:
Muni Agencies- http://webservices.nextbus.com/service/publicXMLFeed?command=agencyList



JSON OBJECT:
https://congress.api.sunlightfoundation.com/upcoming_bills?apikey=f5da3fb0d7b64be8b718f83d2be029e5

=end
