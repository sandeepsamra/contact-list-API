# Homepage (Root path)
get '/' do
  erb :index
end

get '/contacts' do
  Contact.all.to_json
end 

post '/contacts/create' do
  response = Hash.new
  response[:result] = false
  contact = Contact.new(name: params[:name], email: params[:email])

  if contact.save
    response[:result] = true
    response[:id] = contact.id
  end

  response.to_json
end

get '/contacts/:id' do
  contact = Contact.where(name: params[:name], email: params[:email]).to_json
end
