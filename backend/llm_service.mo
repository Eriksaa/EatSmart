import Text "mo:base/Text";
import Debug "mo:base/Debug";
import Result "mo:base/Result";
import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Time "mo:base/Time";
import Int "mo:base/Int";
import Nat "mo:base/Nat";

actor LLMService {
    public type Error = {
        #InvalidInput;
        #ServiceError;
        #RateLimitExceeded;
    };

    public type Result<T> = Result.Result<T, Error>;

    private let MAX_TOKENS = 1024;
    private let MAX_REQUESTS_PER_MINUTE = 30;

    private type RateLimit = {
        count: Nat;
        timestamp: Nat;
    };

    private let rateLimits = HashMap.HashMap<Principal, RateLimit>(0, Principal.equal, Principal.hash);

    private func getCurrentTimestamp() : Nat {
        Int.abs(Time.now())
    };

    private func checkRateLimit(principal: Principal) : Bool {
        let now = getCurrentTimestamp();
        switch (rateLimits.get(principal)) {
            case (?limit) {
                if (now - limit.timestamp > 60) {
                    rateLimits.put(principal, { count = 1; timestamp = now });
                    true
                } else if (limit.count >= MAX_REQUESTS_PER_MINUTE) {
                    false
                } else {
                    rateLimits.put(principal, { count = limit.count + 1; timestamp = limit.timestamp });
                    true
                }
            };
            case null {
                rateLimits.put(principal, { count = 1; timestamp = now });
                true
            };
        };
    };

    private func validateInput(prompt: Text) : Bool {
        prompt.size() > 0 and prompt.size() <= MAX_TOKENS
    };

    private func generateRecipeResponse(ingredients: Text) : Text {
        // Create a JSON response with 3 recipes based on the ingredients
        let response = "{\"recipes\": [" #
            // Recipe 1: Main Course
            "{\"name\":\"Gourmet " # ingredients # " Special\",\"description\":\"A delicious main course featuring your ingredients\",\"cookingTime\":\"35 minutes\",\"difficulty\":\"Medium\",\"servings\":\"4\",\"calories\":\"450 per serving\",\"ingredients\":[\"" # ingredients # "\",\"2 tablespoons olive oil\",\"3 cloves garlic, minced\",\"1 onion, diced\",\"Salt and pepper to taste\",\"Fresh herbs for garnish\"],\"instructions\":[\"Prepare all ingredients\",\"Heat olive oil in a large pan\",\"Sauté garlic and onion until fragrant\",\"Add main ingredients and cook until done\",\"Season with salt and pepper\",\"Garnish with fresh herbs\",\"Serve hot\"],\"tips\":[\"Prep all ingredients before starting\",\"Adjust seasoning to taste\",\"Let rest for 5 minutes before serving\"],\"nutritionalInfo\":{\"protein\":\"28g\",\"carbs\":\"35g\",\"fat\":\"22g\",\"fiber\":\"6g\",\"sodium\":\"450mg\"}}," #

            // Recipe 2: Healthy Option
            "{\"name\":\"Healthy " # ingredients # " Bowl\",\"description\":\"A nutritious and balanced meal\",\"cookingTime\":\"25 minutes\",\"difficulty\":\"Easy\",\"servings\":\"3\",\"calories\":\"380 per serving\",\"ingredients\":[\"" # ingredients # "\",\"1 cup quinoa\",\"2 cups mixed vegetables\",\"1 tablespoon olive oil\",\"Lemon juice\",\"Fresh herbs\"],\"instructions\":[\"Cook quinoa according to package\",\"Prepare the vegetables\",\"Combine ingredients in a bowl\",\"Drizzle with olive oil and lemon\",\"Mix well and serve\"],\"tips\":[\"Use seasonal vegetables\",\"Can be made ahead\",\"Serve warm or cold\"],\"nutritionalInfo\":{\"protein\":\"22g\",\"carbs\":\"42g\",\"fat\":\"18g\",\"fiber\":\"8g\",\"sodium\":\"380mg\"}}," #

            // Recipe 3: Quick Option
            "{\"name\":\"Quick " # ingredients # " Delight\",\"description\":\"A fast and easy recipe perfect for busy days\",\"cookingTime\":\"20 minutes\",\"difficulty\":\"Easy\",\"servings\":\"4\",\"calories\":\"320 per serving\",\"ingredients\":[\"" # ingredients # "\",\"2 tablespoons cooking oil\",\"Basic seasonings\",\"Optional garnishes\"],\"instructions\":[\"Heat oil in pan\",\"Add ingredients and cook\",\"Season to taste\",\"Serve immediately\"],\"tips\":[\"Can be customized easily\",\"Great for meal prep\",\"Add your favorite toppings\"],\"nutritionalInfo\":{\"protein\":\"24g\",\"carbs\":\"28g\",\"fat\":\"16g\",\"fiber\":\"5g\",\"sodium\":\"350mg\"}}]}";

        response
    };

    public shared(msg) func queryText(prompt: Text) : async Result<Text> {
        Debug.print("Received prompt: " # prompt);

        if (not checkRateLimit(msg.caller)) {
            Debug.print("Rate limit exceeded");
            return #err(#RateLimitExceeded);
        };

        if (not validateInput(prompt)) {
            Debug.print("Invalid input");
            return #err(#InvalidInput);
        };

        Debug.print("Generating recipe response");
        let response = generateRecipeResponse(prompt);
        Debug.print("Generated response: " # response);

        #ok(response)
    };

    public shared(msg) func healthCheck() : async Bool {
        true
    };
}
