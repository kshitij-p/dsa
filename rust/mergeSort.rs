fn main() {

    //testing code
    let vec = vec![16, 5, 10, 57, 5, 11, 99, 3, 4, 7, 8];

    let sorted = merge_sort(&vec);

    println!("sorted: {:?}", sorted);
}

fn merge(left_half: Vec<u32>, right_half: Vec<u32>) -> Vec<u32> {
    let mut result = Vec::new();

    let mut left_index = 0;
    let mut right_index = 0;

    while left_index < left_half.len() && right_index < right_half.len() {
        if left_half[left_index] <= right_half[right_index] {
            result.push(left_half[left_index]);
            left_index += 1;
        } else {
            result.push(right_half[right_index]);
            right_index += 1;
        }
    }

    while left_index < left_half.len() {
        result.push(left_half[left_index]);
        left_index += 1;
    }

    while right_index < right_half.len() {
        result.push(right_half[right_index]);
        right_index += 1;
    }

    return result;
}

fn merge_sort(input: &Vec<u32>) -> Vec<u32> {
    if input.len() <= 1 {
        return input.clone();
    }

    let mut left_half = Vec::new();
    let mut right_half = Vec::new();

    let half_point = input.len() / 2;

    for i in 0..half_point {
        left_half.push(input[i]);
    }

    for i in half_point..input.len() {
        right_half.push(input[i]);
    }

    println!("left half: {:?}", left_half);
    println!("right half: {:?}", right_half);

    return merge(merge_sort(&left_half), merge_sort(&right_half));
}
